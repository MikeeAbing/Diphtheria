<?php

namespace Modules\DIPH\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use IndexZer0\EloquentFiltering\Filter\Contracts\AllowedFilterList;
use IndexZer0\EloquentFiltering\Filter\Filterable\Filter;
use IndexZer0\EloquentFiltering\Filter\FilterType;
use IndexZer0\EloquentFiltering\Filter\Traits\Filterable;
use IndexZer0\EloquentFiltering\Contracts\IsFilterable;


use ParagonIE\CipherSweet\BlindIndex;
use ParagonIE\CipherSweet\EncryptedRow;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\LaravelCipherSweet\Concerns\UsesCipherSweet;
use Spatie\LaravelCipherSweet\Contracts\CipherSweetEncrypted;
use Spatie\Permission\Traits\HasRoles;

class Patient extends Model implements IsFilterable, CipherSweetEncrypted
{

    use SoftDeletes;
    use Filterable;
    use UsesCipherSweet;

    protected $table = 'patient_info';
    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'patient_number',
        'firstname',
        'middlename',
        'lastname',
        'suffixname',
        'sex',
        'dateofbirth',
        'ageinyears',
        'ageinmonths',
        'ageindays',
        'member_of_IP',
        'IP_tribe',
        'IP_tribe_specify',
        'pat_address_reg',
        'pat_address_prov',
        'pat_address_city',
        'pat_address_brgy',
        'pat_address_street_name',
        'pat_perm_address_reg',
        'pat_perm_address_prov',
        'pat_perm_address_city',
        'pat_perm_address_brgy',
        'pat_perm_address_street_name',
        'facilityname',
        'occupation',
        'phone_no',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'full_name',
    ];

    protected $with = [];

    public function allowedFilters(): AllowedFilterList
    {
        return Filter::only(
            Filter::field('firstname', [FilterType::EQUAL]),
            Filter::field('middlename', [FilterType::EQUAL]),
            Filter::field('lastname', [FilterType::EQUAL]),
        );
    }

    /**
     * The attributes that are mass assignable.
     *  @var array
     */
    public static function configureCipherSweet(EncryptedRow $encryptedRow): void
    {
        $encryptedRow
            // ->addTextField('patient_number')
            // ->addBlindIndex('patient_number', new BlindIndex('patient_number_index'))
            ->addTextField('firstname')
            ->addBlindIndex('firstname', new BlindIndex('firstname_index'))
            ->addTextField('middlename')
            ->addBlindIndex('middlename', new BlindIndex('middlename_index'))
            ->addTextField('lastname')
            ->addBlindIndex('lastname', new BlindIndex('lastname_index'))
            // ->addTextField('suffixname')
            // ->addBlindIndex('suffixname', new BlindIndex('suffixname_index'))
            // ->addTextField('sex')
            // ->addBlindIndex('sex', new BlindIndex('sex_index'))
            // ->addTextField('dateofbirth')
            // ->addBlindIndex('dateofbirth', new BlindIndex('dateofbirth_index'))
            // ->addTextField('ageinyears')
            // ->addBlindIndex('ageinyears', new BlindIndex('ageinyears_index'))
            // ->addTextField('ageinmonths')
            // ->addBlindIndex('ageinmonths', new BlindIndex('ageinmonths_index'))
            // ->addTextField('ageindays')
            // ->addBlindIndex('ageindays', new BlindIndex('ageindays_index'))
            // ->addTextField('member_of_IP')
            // ->addBlindIndex('member_of_IP', new BlindIndex('member_of_IP_index'))
            // ->addOptionalTextField('IP_tribe')
            // ->addBlindIndex('IP_tribe', new BlindIndex('IP_tribe_index'))
            // ->addOptionalTextField('IP_tribe_specify')
            // ->addBlindIndex('IP_tribe_specify', new BlindIndex('IP_tribe_specify_index'))
            ->addOptionalTextField('pat_address_reg')
            ->addBlindIndex('pat_address_reg', new BlindIndex('pat_address_reg_index'))
            ->addOptionalTextField('pat_address_prov')
            ->addBlindIndex('pat_address_prov', new BlindIndex('pat_address_prov_index'))
            ->addOptionalTextField('pat_address_city')
            ->addBlindIndex('pat_address_city', new BlindIndex('pat_address_city_index'))
            ->addOptionalTextField('pat_address_brgy')
            ->addBlindIndex('pat_address_brgy', new BlindIndex('pat_address_brgy_index'))
            ->addOptionalTextField('pat_address_street_name')
            ->addBlindIndex('pat_address_street_name', new BlindIndex('pat_address_street_name_index'))
            ->addOptionalTextField('pat_perm_address_reg')
            ->addBlindIndex('pat_perm_address_reg', new BlindIndex('pat_perm_address_reg_index'))
            ->addOptionalTextField('pat_perm_address_prov')
            ->addBlindIndex('pat_perm_address_prov', new BlindIndex('pat_perm_address_prov_index'))
            ->addOptionalTextField('pat_perm_address_city')
            ->addBlindIndex('pat_perm_address_city', new BlindIndex('pat_perm_address_city_index'))
            ->addOptionalTextField('pat_perm_address_brgy')
            ->addBlindIndex('pat_perm_address_brgy', new BlindIndex('pat_perm_address_brgy_index'))
            ->addOptionalTextField('pat_perm_address_street_name')
            ->addBlindIndex('pat_perm_address_street_name', new BlindIndex('pat_perm_address_street_name_index'))
            ->addOptionalTextField('facilityname')
            ->addBlindIndex('facilityname', new BlindIndex('facilityname_index'))
            ->addOptionalTextField('occupation')
            ->addBlindIndex('occupation', new BlindIndex('occupation_index'));
            // ->addOptionalTextField('phone_no')
            // ->addBlindIndex('phone_no', new BlindIndex('phone_no_index'));
    }

    /**
     * Access the full name of the user
     *
     * @return string
     */
    public function getFullNameAttribute()
    {
        $full_name = ucfirst($this->firstname);

        if ($this->middlename) {
            $full_name .= ' ' . ucfirst($this->middlename);
        }

        $full_name .= ' ' . ucfirst($this->lastname);

        if ($this->suffixname && $this->suffixname !== 'N/A') {
            $full_name .= ', ' . strtoupper($this->suffixname);
        }

        return $full_name;
    }

    public function getCanAttribute()
    {
        return [
            'update' => auth()->user()->can('update', $this),
            'delete' => auth()->user()->can('delete', $this),
        ];
    }

    public function diph(){
        return $this->hasMany(DIPH::class, 'patient_number', 'patient_number');
    }
}
